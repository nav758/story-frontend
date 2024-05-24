import { useState } from "react";
import styles from "../../components/Register/Register.module.css";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { registerUser } from "../../apis/auth";

function Register({ onClose }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPopup, setShowPopup] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    // console.log(formData);
  };

  const handleRegister = async () => {
    if (!formData.username || !formData.password)
      console.log(formData);
      await registerUser(formData);

    onClose();
  };

  return (
    <div className={`${styles.popup} ${showPopup ? styles.show : ""}`}>
      <div className={styles.popup__content}>
        <h4>Register to SwipTory</h4>
        <div className={styles.popup__content_i}>
          <label>Username</label>
          <input
            type=""
            placeholder="Enter username"
            onChange={handleChange}
            name="username"
          />
        </div>
        <div className={styles.popup__content_i}>
          <label>Password </label>

          <div className={styles.password_input_container}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Passward"
              onChange={handleChange}
              name="password"
            />
           

            <div
              className={styles.eye_icon}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEyeOff /> : <IoEye />}
            </div>
          </div>
        </div>
        <div className={styles.popup__buttons}>
          <button onClick={handleRegister}>Register</button>
        </div>
        <button className={styles.popup_button_cancel} onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
}

export default Register;
