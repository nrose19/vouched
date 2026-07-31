package com.nicolecohen.vouched.repository;

import com.nicolecohen.vouched.enums.CommunityVisibility;
import com.nicolecohen.vouched.model.Community;
import com.nicolecohen.vouched.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;
import java.util.UUID;

@Repository
public interface CommunityRepository extends JpaRepository<Community, UUID>{

    List<Community> findByCityName(String cityName);

    List<Community> findByCreator(User creator);

    List<Community> findByCityNameAndVisibility(String cityName, CommunityVisibility visibility);
}
