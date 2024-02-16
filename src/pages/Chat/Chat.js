import React, { useState, useRef, useEffect } from 'react';
import styles from './Chat.module.css';
import Header from "../../components/Header/Header";
import Textarea from "../../components/@common/Textarea/Textarea";
import Button from "../../components/@common/Button/Button";
import {ReactComponent as MemberIcon} from "../../assets/icon/member-icon.svg"
import instance from "../../api/instance.js";
import { userState } from '../../state/state';
import { RecoilValueReadOnly, useRecoilState } from 'recoil';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone,faMicrophoneSlash,faStop } from '@fortawesome/free-solid-svg-icons'
import { Form } from 'react-router-dom';
import ENV from '../../api/env'
import TableItem from '../../components/@common/TableItem/TableItem';


const Chat = () => {
    const chatListRef = useRef(null);
    const [userId, setUserId] = useRecoilState(userState);
    const [context, setContext] = useState([]);
    const [input, setInput] = useState('');
    //MediaRecorder
    const [permission, setPermission] = useState(false);
    const [stream, setStream] = useState(null);
    const mediaRecorder = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [audioChunks, setAudioChunks] = useState([]);
    const [audio, setAudio] = useState(null);
    const [final, setFinal] = useState(false);
    const [mimeType, setMimeType] = useState("video/mp4");
    const isMobile = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    }
    const initContext = {
      "role" : "jobvis",
      "content" : `안녕하세요 ${userId}, 저는 AI비서 Jobvis입니다.\n 저는 여러분의 약속 일정을 잡아드리는 일을 주로 하고 있어요.
      약속 시간과, 장소 그리고 함께 만나는분의 성함과, 약속의 목적 등을 말씀해주세요.`
    };

    const headers = [
      {
        text: "시작 일",
        value : "sdate"
      },
      {
        text: "시작 시각",
        value : "stime"
      },
      {
        text: "종료 일",
        value : "edate"
      },
      {
        text: "종료 시각",
        value : "etime"
      },
      {
        text: "내용",
        value : "summary"
      },
    ];

    useEffect(()=>{
      setContext([initContext]);
    }, [])

    useEffect(()=>{
      scrollToBottom();
    }, [context]);

    const getMicrophonePermission = async() => {
      if ("MediaRecorder" in window){
        try {
          const streamData = await navigator.mediaDevices.getUserMedia({
            audio:true,
            video:false,
          });
          setPermission(true);
          setStream(streamData);
        } catch (err) {
          alert(err.message);
        }
      }
    }

    const startRecording = async() => {
      setRecordingStatus("recording");
      //create new Media recorder instance using the stream
      const media = new MediaRecorder(stream, {type:mimeType});
      mediaRecorder.current = media;
      //invokes the start method to start the recording process
      mediaRecorder.current.start();
      let localAudioChunks = [];
      mediaRecorder.current.ondataavailable = (event) => {
        if (typeof event.data === "undefined") return ;
        if (event.data.size === 0) return ;
        localAudioChunks.push(event.data);
      }
      setAudioChunks(localAudioChunks);
    }

    const stopRecording = () => {
      setRecordingStatus("inactive");
      //stops the recording instance
      mediaRecorder.current.stop();
      mediaRecorder.current.onstop = async() => {
        requestStt(audioChunks);
        const audioBlob = new Blob(audioChunks, {type:mimeType});
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudio(audioUrl);
        setAudioChunks([]);
      }
    }
    const requestStt = async(audioChunks) => {
      const formData = new FormData();
      const audiofile = new File(audioChunks, "audiofile.mp4", {
        type: mimeType,
      });
      formData.append('file',audiofile);
      formData.append('model','whisper-1');
      await instance.post(`https://api.openai.com/v1/audio/transcriptions`,formData,{
        headers: {
          'Authorization': `Bearer ${ENV.REACT_APP_OPENAI_API_KEY}`,
          'Content-Type':'multipart/form-data'
        },
      })
      .then((res)=>{
        setInput(res.data.text)
      }).catch(err=>{
      });
    }
    const scrollToBottom = () => {
      // chatListRef.current?.scrollIntoView({behavior: 'smooth'});
      if(chatListRef.current){
        chatListRef.current.scrollTop=chatListRef.current.scrollHeight;
      }
    }

    const handleKeyDown = (e) =>{
      // console.log("handleKeyDown " + e.key);
      if(!isMobile() && e.key === "Enter" && !e.shiftKey){
        e.preventDefault();
        handleSendButton();
      }
    }
    const handleRecordButton = async() =>{
      console.log("record");
      
    }

    const handleResetButton = async() =>{
      setContext([initContext]);
      await instance.delete(`/api/reset?user=${userId}`)
      .then((res)=>{
        console.log(res);
      }).catch(err=>{
        console.log(err);
      });
    }

    const handleSendButton = (text) =>{
      setInput('');
      const content = text ?? input;
      setContext(context => [...context, {
        "role" : "user",
        "content" : content
      }, {
        "role" : "jobvis",
        "content" : "..."
      }]);
      instance.post("/api/chat", {
        "user": userId,
        "content": content
      }).then(async(response)=>{
        console.log(response.data);
        let events = null;
        if (response.data.event_info !== null){
            events = await response.data.event_info.map((el)=>{
              console.log(el);
              const {start, end, ...event} = el;
              const [sdate, stime] = start.dateTime.split("T")
              const [edate, etime] = end.dateTime.split("T")
              event["sdate"] = sdate;
              event["stime"] = stime.substr(0, 8);
              event["edate"] = edate;
              event["etime"] = etime.substr(0, 8);
              return event;
          })
          console.log(events);
        }
       
        setContext((context)=>{
          const newList = [...context];
          newList.pop();
          // console.log(newList);
          return [...newList, {
            "role" : "jobvis",
            "content" : response.data.content,
            "event_info" : events
          }];
        })
      });
    }

    return (
      <div className={styles.chatBody}>
        <div className={styles.chatContainer} ref={chatListRef}>
          <ul className={styles.chatList} >
            {context.map((el, idx)=>{
              return (<li key={idx}>
                        <div>
                          <div className={styles.chatMessage} style={{backgroundColor:el.role=="user"?"#FFFFFF":"#EEEEEE"}}>
                            <div style={{marginTop:"15px"}}>
                              <MemberIcon width="30" height="30"/>
                            </div>
                            <div className={styles.chatMessageContext}>
                              {el.content.split('\n').map((line, j) =>
                                <div key={j}>{line}</div>
                              )}
                            </div>
                          </div>
                          {el.event_info != null
                            ?<div style={{"margin" : "10px", "marginBottom":"50px"}}>
                              <TableItem
                                headers={headers}
                                items={el.event_info}/>
                              </div>
                            :null}
                        </div>
                      </li>)
            })}
          </ul>
        </div>
        <div className={styles.bottomContainer}>
          <div style={{display:"flex",justifyContent:"center"}}>
            <Button 
                style={{backgroundColor:"#ffffff", opacity:"0.5", color:"black"}}
                onClick={()=>handleResetButton()}
              >Reset</Button>
          </div>
          {audio ? (
          <div style={{display:'none', justifyContent:"center"}}>
            <audio src={audio} controls></audio>
              <a download href={audio}>
                  Download Recording
              </a>
          </div>
          ) : null}
          <div className={styles.textInput}>
            <div style={{display:'flex', justifyContent:"center"}}>
              <div className="audio-controls">
                {!permission ? 
                  <Button 
                    className={styles.button}
                    style={{backgroundColor:"grey", opacity:"0.5", color:"black"}}
                    onClick={getMicrophonePermission}
                    ><FontAwesomeIcon icon={faMicrophoneSlash} /></Button>
                  :(recordingStatus === "inactive"?
                    <Button
                      className={styles.button}
                      style={{backgroundColor:"red", opacity:"0.5", color:"black"}}
                      onClick={startRecording}
                      ><FontAwesomeIcon icon={faMicrophone} /></Button>
                    :<Button 
                      className={styles.stopButton}
                      style={{backgroundColor:"red", color:"black"}}
                      onClick={stopRecording}
                      ><FontAwesomeIcon icon={faStop} /></Button>)}
              </div>
            </div>
            <Textarea
              type="text"
              label="message"
              placeholder="jobvis에게 요청하세요."
              onChange={(e)=>setInput(e.target.value)}
              value={input}
              onKeyPress={e=>handleKeyDown(e)}
              style={{overflow:"hidden",height:"100%",resize:"none"}}
              />
            <Button
              className={styles.button}
              onClick={()=>handleSendButton()}
              >Send</Button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Chat;