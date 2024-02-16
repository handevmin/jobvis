import {atom} from 'recoil';

export const userState = atom({
    key: "userState",
    default : ""
});

export const googleCredential = atom({
    key:"googleCredential",
    default : ""
});