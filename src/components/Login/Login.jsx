import { useState, useContext } from "react";
import styles from "../../components/Register/Register.module.css";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { loginUser } from "../../apis/auth";
import { useNavigate } from "react-router-dom";
import {UserContext} from "../../utils/UserContext";

function Login({ onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const { setUsername } = useContext(UserContext); // Accessing context
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleFormChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  
  const handleSubmit = async () => {
    if (!formData.username || !formData.password) {
      alert("Fields can't be empty");
      return;
    }

    const result = await loginUser(formData);
    console.log("Login result:", result);
    if (result) {
      setUsername(formData.username); 
      navigate("/singedIn");
    }

    onClose(); 
  };

  return (
    <div className={`${styles.popup} ${styles.show}`}>
      
      <div className={styles.popup__content}>
        <h4>Login to SwipTory</h4>
        <div className={styles.popup__content_i}>
          <label>Username</label>
          <input
            type=""
            name="username"
            value={formData.username} 
            onChange={handleFormChange}
            placeholder="Username"
          />
        </div>
        <div className={styles.popup__content_i}>
          <label>Password </label>

          <div className={styles.password_input_container}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password} // Set the value of the input
              onChange={handleFormChange}
              placeholder="Password"
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
          <button onClick={handleSubmit}>Login</button>
        </div>
        <button className={styles.popup_button_cancel} onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
}

export default Login;
