import React, { useEffect, useState } from 'react';
import { getFollowersFollowing } from '../../services/api';

const FollowersFollowingModal = ({ userId, type, onClose }) => {

    console.log("FollowersFollowingModal==>", type, userId)
    const [connections, setConnections] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConnections = async () => {
            try {
                const response = await getFollowersFollowing(userId, type);
                setConnections(response.data[type]);
                setLoading(false);
            } catch (error) {
                console.error(`Error fetching ${type}:`, error);
                setLoading(false);
            }
        };

        fetchConnections();
    }, [userId, type]);

    if (loading) {
        return <div className="p-4">Loading...</div>;
    }

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-lg w-full">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-semibold">{type === 'followers' ? 'Followers' : 'Following'}</h2>
                </div>
                <div className="p-4 max-h-96 overflow-y-auto">
                    {connections.map((connection) => (
                        <div key={connection._id} className="flex items-center space-x-4 mb-4">
                            <img
                                src={connection.profile?.profilePicture || '/default-profile.png'} // Handle case where profilePicture may not be available
                                alt={connection.username}
                                className="w-10 h-10 rounded-full"
                            />
                            <span className="font-semibold">{connection.username}</span>
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t">
                    <button
                        onClick={onClose}
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FollowersFollowingModal;
