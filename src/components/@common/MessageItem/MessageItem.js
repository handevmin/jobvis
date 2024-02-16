import classNames from "classnames";
import styles from "./MessageItem.module.css";

const MessageItem = ({
  ...props
}) => {
  return (
    <div className={classNames(styles.box, className)}>
      <div className={styles["text-field"]}>
        <Label className={styles.label} required={required}>
          {label}
        </Label>
        {description && <Description>{description}</Description>}
        {maxLength && maxLength > 0 && (
          <div className={styles["length-limit"]}>
            {value?.length} / {maxLength}
          </div>
        )}
        <Textarea
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          {...props}
        />
      </div>
      <p className={styles["rule-field"]}>{errorMessage}</p>
    </div>
  );
};

// MessageTextarea.propTypes = {
//   label: PropTypes.string,
//   required: PropTypes.bool,
//   description: PropTypes.node,
//   maxLength: PropTypes.number,
//   initialValue: PropTypes.string,
//   name: PropTypes.string.isRequired,
// };

// MessageTextarea.defaultProps = {
//   value: "",
//   label: "",
//   required: false,
//   description: "",
// };

export default MessageItem;
