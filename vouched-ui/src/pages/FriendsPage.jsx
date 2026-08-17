import { useState, useEffect } from "react";
import { getMyFriends, getPendingRequests, acceptRequest, declineRequest, removeFriend } from "../api/friendships";



function FriendsPage() {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData(){
      try{
        //call both getPending and getFriends, set both peices of state from the two responses
        const pending = await getPendingRequests();
        const response = await getMyFriends();

        setPendingRequests(pending.data);
        setFriends(response.data);
        
      } catch (err){
        setError("Could not load friendship data");
      } finally {
        setLoading(false);
      }

    }
    fetchData();
  }, [])


  async function handleAccept(friendshipId){
    try{
      const result = await acceptRequest(friendshipId);
      //filter friendship id out of pending requests
      setPendingRequests(prev => prev.filter(request => request.friendshipId !== friendshipId));
      //add this new friend to friends
      setFriends(prev => [...prev, result.data]);

    } catch (err) {
      setError("Could not accept request.");
    }
  }


  async function handleDecline(friendshipId){
    try{
      await declineRequest(friendshipId);
      //filter friendship id out of pending requests
      setPendingRequests(prev => prev.filter(request => request.friendshipId !== friendshipId));

    } catch (err){
      setError("Could not decline request.");
    }
  }

  return(
    <div className="p-8">
      <h1 className="font-display text-3xl mb-4">Friendships</h1>

      {loading && <p>Loading...</p>}

      {error && <p className="text-brick text-sm">{error}</p>}

      {!loading && !error && (
        <>
          <h2 className="font-display text-xl mb-2">Pending requests</h2>
          {pendingRequests.map(request => (
            <div key={request.friendshipId} className="flex justify-between items-center bg-paper rounded-lg p-3 mb-2">
              <span>{request.friendDisplayName}</span>
              <div>
                <button onClick={() => handleAccept(request.friendshipId)} className="bg-moss text-paper-light px-3 py-1 rounded-lg mr-2">Accept</button>
                <button onClick={() => handleDecline(request.friendshipId)} className="bg-brick text-paper-light px-3 py-1 rounded-lg">Decline</button>
              </div>
            </div>
          ))}

          <h2 className="font-display text-xl mb-2 mt-6">Friends</h2>
          {friends.map(friend => (
            <div key={friend.friendshipId} className="bg-paper rounded-lg p-3 mb-2">
              {friend.friendDisplayName}
            </div>
          ))}
        </>
      )}
    </div>
  )

}
export default FriendsPage;