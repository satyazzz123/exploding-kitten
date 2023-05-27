import { useSelector } from "react-redux";
import { selectInventory } from "../state/gameSlice";
import {BsFillCalculatorFill} from "react-icons/bs";
import {IoLogoOctocat} from "react-icons/io"

function Inventory() {
	const inventory = useSelector(selectInventory);
	const shuffle =  inventory.defuse;
	const cat = inventory.cat;

	return <div className="inventory">
      <span style={{fontSize:"20px"}}> <BsFillCalculatorFill style={{transform:"translateY(1.5px)"}}/>-{shuffle}</span>
      <span style={{fontSize:"20px"}}><IoLogoOctocat style={{transform:"translateY(3px)"}}/>-{cat}</span>
   </div>;
}

export default Inventory;
