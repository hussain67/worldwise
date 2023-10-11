/* eslint-disable react/prop-types */
import styles from "./Message.module.css";
function Messsage({ message }) {
	return (
		<p className={styles.message}>
			<span role="img">👋</span>
			{message}
		</p>
	);
}

export default Messsage;
