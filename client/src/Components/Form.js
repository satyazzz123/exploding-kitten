import { useDispatch, useSelector } from "react-redux";
import {
	changeUser,
	selectCurrentUser,
	selectCurrentUserId,
} from "../state/userSlice";
import { useState } from "react";

function Form() {
	const currentUser = useSelector(selectCurrentUser);
	const currentUserId = useSelector(selectCurrentUserId);
	const dispatch = useDispatch();
	const [isFormActive, setIsFormActive] = useState(false);
	const [username, setUsername] = useState(currentUser);

	const handleSubmit = async () => {
		try {
			const response = await fetch(`http://localhost:3000/users`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username }),
			});
			const userData = await response.json();
			dispatch(changeUser(userData));
			setIsFormActive(false);
		} catch (error) {}
	};

	return (
		<div className="form">
			<span className="formLabel">
				{`You are currently playing as ${currentUser}`}
				{!currentUserId && ", your score won't be saved."}
			</span>
			<div className="formInput">
				{isFormActive && (
					<>
						<input
							type="text"
							name="username"
							id="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							style={{background:"#B175FF"}}
						/>
						<button style={{background:"#B175FF",border:"none",color:"#211522",borderRadius:"5px",width:"5rem"}} aria-label="change username" onClick={handleSubmit}>
							Change user
						</button>
					</>
				)}
				<button style={{background:"#B175FF",border:"none",color:"#211522",borderRadius:"5px",width:"5rem"}}
					aria-label="show input form"
					onClick={() => setIsFormActive(!isFormActive)}
				>
					{!isFormActive ? "Change user" : "Cancel"}
				</button>
			</div>
		</div>
	);
}

export default Form;
