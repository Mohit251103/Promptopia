import { connectToDB } from "@utils/database";
import Prompt from "@model/prompt";

//GET

export const GET = async (request,{params}) => {
    try {
        // console.log(request);
        await connectToDB();
        
        const prompt = await Prompt.findById(params.id).populate('creator');
        if(!prompt) return new Response("Prompt not found",{status:404});
        return new Response(JSON.stringify(prompt),{status:200})
    } catch (error) {
        return new Response("Internal server error",{status:500})
    }
}

//PATCH

export const PATCH = async (request, {params}) => {
    const {prompt, tag} = await request.json();
    // console.log(prompt,tag);

    try {
        await connectToDB();
        
        const existingPrompt = await Prompt.findById(params.id).populate('creator');
        // console.log(existingPrompt);
        if(!existingPrompt) return new Response("Prompt not found",{status:404});

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        // console.log(existingPrompt);

        await Prompt.findByIdAndUpdate(params.id,existingPrompt)
        return new Response(JSON.stringify(existingPrompt),{status:200})
    } catch (error) {
        return new Response("Failed to update prompt",{status:500})
    }
}


//DELETE

export const DELETE = async (request, {params}) => {

    try {
        await connectToDB();
        await Prompt.findByIdAndDelete(params.id);
    
        return new Response("Prompt deleted successfully", {status: 200})
    } catch (error) {
        return new Response("Failed to delete the prompt",{status:500});
    }
}