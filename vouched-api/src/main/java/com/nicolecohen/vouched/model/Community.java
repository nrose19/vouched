package com.nicolecohen.vouched.model;

import com.nicolecohen.vouched.enums.CommunityType;
import com.nicolecohen.vouched.enums.CommunityVisibility;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

//OUT OF MVP -- SCALED BACK -- WILL NOT COMPLETE FOR DISSERTATION
@Entity
@Table(name = "community", uniqueConstraints = @UniqueConstraint(
        columnNames = {"name", "city_name"}
))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Community {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creator_id", nullable = false)
    private User creator;

    //stored as plain string for MVP - refactor to @ManyToOne for a City entity in future development
    @Column(name = "city_name", nullable = false)
    private String cityName;

    @Column(nullable = false)
    private String name;

    @Column(length = 500)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CommunityType type;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CommunityVisibility visibility;

    private boolean isArchived;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
