package com.nicolecohen.vouched.repository;

import com.nicolecohen.vouched.enums.FriendshipStatus;
import com.nicolecohen.vouched.model.Friendship;
import com.nicolecohen.vouched.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface FriendshipRepository extends JpaRepository<Friendship, UUID>{

    List<Friendship> findByAddresseeAndStatus(
            User addressee, FriendshipStatus status
    );

    List<Friendship> findByRequesterAndStatus(
            User requester, FriendshipStatus status
    );

    //need unique queries for the both direction friendship check...too complex for Spring Data's derived method names
    @Query("""
        SELECT f FROM Friendship f
        WHERE f.status = :status
        AND (f.requester = :user OR f.addressee = :user)
    """)
    List<Friendship> findAllFriendshipsByUserAndStatus(
            @Param("user") User user,
            @Param("status") FriendshipStatus status
    );

    @Query("""
        SELECT f FROM Friendship f
        WHERE (f.requester = :userA AND f.addressee = :userB)
        OR (f.requester = :userB AND f.addressee = :userA)
    """)
    Optional<Friendship> findBetweenUsers(
            @Param("userA") User userA,
            @Param("userB") User userB
    );

}
