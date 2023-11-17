export const project ={
    name:"users",
    title:"Users",
    type:"document",
    fields:[
        {
            name:"walletAddress",
            title:"Wallet Address",
            type:"string",
        },
        {
            name:"isApproved",
            title:"Is Approved",
            type:"boolean",
        },
        {
            name:"name",
            title:"Name",
            type:"string",
        },
       
        {
            name:"email",
            title:"Email",
            type:"string",
        },
      
    ]    ,    preview: {
        select: {
            title: 'name', // Use the 'name' field as the main title
            subtitle: 'email', // Use the 'email' field as the subtitle
            wallet: 'walletAddress',
                         approved: 'isApproved'

        }       , prepare({ title, subtitle, wallet,approved }) {
            return {
                title: title || wallet, // If 'name' is not present, use 'walletAddress'
             subtitle: `${subtitle ? subtitle : ""} - ${approved ? 'Approved' : 'Not Approved'}`
            }
        }

    }

}

