package com.nicolecohen.vouched.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "community_spots", uniqueConstraints = @UniqueConstraint(
        columnNames = {"community_id", "spot_id"}
))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommunitySpot {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "community_id", nullable = false)
    private Community community;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "spot_id", nullable = false)
    private Spot spot;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shared_by", nullable = false)
    private User sharedBy;

    @CreationTimestamp
    @Column(updatable = false, nullable = false)
    private LocalDateTime sharedAt;

}
