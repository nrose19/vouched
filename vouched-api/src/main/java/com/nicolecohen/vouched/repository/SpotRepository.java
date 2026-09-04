package com.nicolecohen.vouched.repository;

import com.nicolecohen.vouched.enums.PrivacyLevel;
import com.nicolecohen.vouched.model.Spot;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SpotRepository extends JpaRepository<Spot, UUID> {

    List<Spot> findByCity(String city);

    List<Spot> findByOwnerId(String ownerId);

    List<Spot> findByCityAndCategory(String city, String category);

//    AI assisted
    @Query("""
        SELECT s.ownerId, COUNT(s)
        FROM Spot s
        WHERE s.ownerId IN :ownerIds
        GROUP BY s.ownerId
    """)
    List<Object[]> findSpotCountsByOwnerIds(
            @Param("ownerIds") List<String> ownerIds
    );

    List<Spot> findByOwnerIdOrPrivacyLevelIn(
            String ownerId,
            List<PrivacyLevel> privacyLevels
    );

//    AI created - updating the spots added prior to leaflet/open map integration -- need to update their lat/lon
    List<Spot> findByLatitudeIsNull();

    //[AI created 25/08/2026 - to fix a security bug with the spots]
    @Query("""
    SELECT s FROM Spot s
    WHERE s.ownerId = :currentUserId
    OR (s.ownerId IN :friendIds AND s.privacyLevel = :privacyLevel)
    """)
    List<Spot> findVisibleSpots(
            @Param("currentUserId") String currentUserId,
            @Param("friendIds") List<String> friendIds,
            @Param("privacyLevel") PrivacyLevel privacyLevel
    );
}
