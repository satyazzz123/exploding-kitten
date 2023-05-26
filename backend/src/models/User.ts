
import mongoose, { Document } from 'mongoose'


class User extends Document {
	username: string | undefined;
	score: number | undefined;
	noOfGamesPlayed: number | undefined;
}

const userSchema=new mongoose.Schema<User>({
   username:{
        type:String,
        required:true,
        unique:true
    },
	score: { type: "number", sortable: true },
	noOfGamesPlayed: { type: "number" },
	

});
export const userModel=mongoose.model("users",userSchema)


