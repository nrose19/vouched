package com.nicolecohen.vouched.repository;

import com.nicolecohen.vouched.model.CommunitySpot;
import com.nicolecohen.vouched.model.User;
import com.nicolecohen.vouched.model.Community;
import com.nicolecohen.vouched.model.Spot;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

//OUT OF MVP -- SCALED BACK -- WILL NOT COMPLETE FOR DISSERTATION
@Repository
public interface CommunitySpotRepository extends JpaRepository<CommunitySpot, UUID>{

    //Checks if a spot has already been shared into this community
    Optional<CommunitySpot> findByCommunityAndSpot(Community community, Spot spot);

    //Gets all spots shared into community
    List<CommunitySpot> findByCommunity(Community community);
}
