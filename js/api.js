/*function till att hämta ett api där vi specificerar vilket api vi
vill hämta i paramsen på functionen
Detta gör functionen återanvändiningsbar*/
export async function getDataFromApi(url) {
        
        const response = await fetch(url);

        if(!response.ok) {
            throw new Error("Server didnt start properly")
        }
        const data = await response.json();

        return data;
}



