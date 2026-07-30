package com.nicolecohen.vouched.model;

import com.nicolecohen.vouched.enums.CommunityMemberRole;
import com.nicolecohen.vouched.enums.CommunityMemberStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "community_members", uniqueConstraints = @UniqueConstraint(
        columnNames = {"community_id", "user_id"}
))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommunityMember {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "community_id", nullable = false)
    private Community community;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CommunityMemberRole role;

    // Single entity covers full membership lifecycle:
    // PENDING = join request awaiting approval
    // ACCEPTED = active community member
    // DECLINED = rejected join request
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CommunityMemberStatus status;

    @CreationTimestamp
    @Column(updatable = false, nullable = false)
    private LocalDateTime joinedAt;

    private LocalDateTime respondedAt;


}
