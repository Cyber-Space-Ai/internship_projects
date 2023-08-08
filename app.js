require('dotenv').config();
const {MongoClient}=require('mongodb');
const client =new MongoClient (process.env.Mongo_URL);

async function main(){
    await client.connect ();
    console.log('connection ok');
    const db=client.db('internship');
    const collection= db.collection ('document');
    try {
        
        const inserdata = await collection.insertMany([
{
    name:'zahra'
}
        ]);
        console.log ('document inser=>',inserdata);

    }catch(e){ throw e ;}


_};
main()
.then(console.log)
 .catch(console.error)
.finally(()=>client.close());