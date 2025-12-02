import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export async function GET(request, {params}){
    const param = await params;
    
    try{
        const [cabin,bookedDates] = await Promise.all([
            getCabin(param.cabinId),
            getBookedDatesByCabinId(param.cabinId)
        ]);

        return Response.json({ cabin, bookedDates });
    } catch(err){
        return Response.json({message: "Cabin not found"});
    }
}