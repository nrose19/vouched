package com.nicolecohen.vouched.repository;

import com.nicolecohen.vouched.enums.CommunityMemberStatus;
import com.nicolecohen.vouched.model.Community;
import com.nicolecohen.vouched.model.CommunityMember;
import com.nicolecohen.vouched.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;
import java.util.UUID;

@Repository
public interface CommunityMemberRepository extends JpaRepository<CommunityMember, UUID>{

    //List of specific community + status of all members/pending requests
    List<CommunityMember> findByCommunityIdAndStatus(UUID communityId, CommunityMemberStatus status);

    //finding members with specific status
    List<CommunityMember> findByUserAndStatus(User user, CommunityMemberStatus status);

    //finding communities that belong to specific user
    Optional<CommunityMember> findByUserAndCommunity(User user, Community community);

}
