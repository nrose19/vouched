import { useState, useEffect } from "react";
import { getMyFriends, getPendingRequests, acceptRequest, declineRequest, removeFriend } from "../api/friendships";
import { NavLink, useOutletContext } from "react-router-dom";


function FriendsFollowingPage() {
  const {user, following} = useOutletContext();
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

  //split pendingRequests by direction
  const incomingRequests = pendingRequests.filter(r => !r.youSentRequest);
  const sentRequests = pendingRequests.filter(r => r.youSentRequest);

  async function handleAccept(friendshipId){
    try{
      const result = await acceptRequest(friendshipId);
      setPendingRequests(prev => prev.filter(request => request.friendshipId !== friendshipId));
      setFriends(prev => [...prev, result.data]);

    } catch (err) {
      setError("Could not accept request.");
    }
  }


  async function handleDecline(friendshipId){
    try{
      await declineRequest(friendshipId);
      setPendingRequests(prev => prev.filter(request => request.friendshipId !== friendshipId));

    } catch (err){
      setError("Could not decline request.");
    }
  }

  return(
    <div className="p-8">
        <h1 className="text-5xl">Friendships</h1>
          <NavLink to="/profile/" className="flex justify-end mb-2 pr-6 text-sm">Back to Profile</NavLink>
          <h2 className="font-display text-xl mb-2">Pending requests</h2>
          {incomingRequests.length === 0 && <p className="text-sm text-stone">No pending requests</p>}
          {incomingRequests.map(request => (
            <div key={request.friendshipId} className="flex justify-between items-center bg-paper rounded-lg p-3 mb-2">
              <span>{request.friendDisplayName}</span>
              <div>
                <button onClick={() => handleAccept(request.friendshipId)} className="bg-moss text-paper-light px-3 py-1 rounded-lg mr-2">Accept</button>
                <button onClick={() => handleDecline(request.friendshipId)} className="bg-brick text-paper-light px-3 py-1 rounded-lg">Decline</button>
              </div>
            </div>
          ))}

          <h2 className="font-display text-xl mb-2 mt-6">Sent requests</h2>
          {sentRequests.length === 0 && <p className="text-sm text-stone">No sent requests awaiting response</p>}
          {sentRequests.map(request => (
            <div key={request.friendshipId} className="flex justify-between items-center bg-paper rounded-lg p-3 mb-2">
              <span>{request.friendDisplayName}</span>
              <span className="text-stone text-sm">pending...</span>
            </div>
          ))}


          <h2 className="font-display text-xl mb-2 mt-6">Friends</h2>
          {friends.length === 0 && <p className="text-sm text-stone">No friends yet</p>}
          {friends.map(friend => (
            <div key={friend.friendshipId} className="bg-paper rounded-lg p-3 mb-2">
              {friend.friendDisplayName}
            </div>
          ))}
    </div>
  )

}
export default FriendsFollowingPage;