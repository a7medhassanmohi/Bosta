import axios from "axios";

export function findTrackingNumber(number){
    return axios.get(`https://tracking.bosta.co/shipments/track/${number}`)
}