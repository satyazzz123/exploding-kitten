import { useRef, useState, useEffect } from "react";
import cat from "../Photos/cat.png";
import bomb from "../Photos/bomb.png"
import diffuser from "../Photos/diffuser.png"
import reverse from "../Photos/reverse.png"
import ques from "../Photos/ques.jpg"

function Card({ onDraw, id, type, isClickable }) {
	const [isHidden, setIsHidden] = useState(true);
	const ref = useRef(null);

	useEffect(() => {
		const handleClick = () => {
			element.removeEventListener("click", handleClick);
			setIsHidden(false);
			onDraw(id, type);
		};
		const element = ref.current;
      if(isClickable){
         element.addEventListener("click", handleClick);
      }
		return () => {
			element.removeEventListener("click", handleClick);
		};
	}, [isClickable]);

	let content;

	
	if (isHidden) content =ques;
	
	else {
		switch (type) {
			case "cat":
				content = cat;
				break;
			case "defuse":
				content = diffuser;
				break;
			case "bomb":
				content = bomb;
				break;
			case "shuffle":
				content = reverse;
				break;
			default:
				content = ques;
		}
	}
	return (
		<span className={`card ${isHidden ? "hidden" : "notHidden"}`} ref={ref}>
			<h2 className="cardContent"><img style={{height:"10rem",width:"8rem",borderRadius:"10px"}} src={content} alt="" /></h2>
		</span>
	);
}

export default Card;
