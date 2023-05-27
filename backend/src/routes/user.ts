import express, { Request, Response } from "express";
import {userModel} from "../models/User";

const router = express.Router();

router.get("/:userId", async (req: Request, res: Response) => {
	try {
		const { userId } = req.params;
		const repository = await userModel;
		const user = await repository.findById(userId);//findbyid
		if (user) res.status(200).json(user);
		else throw new Error("user not found");
	} catch (error) {
		res.status(404).json({ msg: error });
	}
});

router.get("/", async (req: Request, res: Response) => {//leaderobard score
	try {
		const repository = await userModel;
		const users = await repository.find({}).sort('score');//find
		res.status(200).json(users);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
});

router.post("/", async (req: Request, res: Response) => {
	try {
		const { username } = req.body;
		const repository = await userModel;
		const user = await repository.findOne({username});
		if(user) {
			return res.status(200).json(user);
		}
		const newUser = new userModel({///creeating
			username,
			score: 0,
			noOfGamesPlayed: 0,
		});
		await newUser.save()
		res.status(201).json(newUser);
	} catch (error) {
		res.status(500).json({ error });
	}
});

// 	router.patch("/", async function (req: Request, res: Response)  {
// 	try {
// 		const { entityId, score, noOfGamesPlayed } = req.body;
		
// 		const user = await userModel.find(entityId);	
// 		user.score = score;
// 		user.noOfGamesPlayed = noOfGamesPlayed;
// 		await user.save();
// 		res.status(201).json(user);
// 	} catch (error) {
// 		res.status(500).json({ error });
// 	}
// });

export default router;
