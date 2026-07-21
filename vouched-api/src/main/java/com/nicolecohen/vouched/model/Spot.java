package com.nicolecohen.vouched.model;

import com.nicolecohen.vouched.enums.Category;
import com.nicolecohen.vouched.enums.PrivacyLevel;
//lombok allows for automatic creation of getters/setters. This de-clutters the file and saves us from boiler plate code
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "spots")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Spot {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String ownerId;

    @Column(nullable = false)
    private String city;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Category category;

    @Column(nullable = false)
    private String name;

    //JPA default behavior
    private String address;

    @Column(length = 500)
    private String notes;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PrivacyLevel privacyLevel;

    @ElementCollection
    @CollectionTable(
            name = "spot_tags",
            joinColumns = @JoinColumn(name = "spot_id")
    )
    @Column(name = "vibe_tags")
    private List<String> vibeTags;

    //JPA default behavior
    private boolean isVisited;

    //JPA default behavior
    private boolean wantsToVisit;

    //JPA default behavior
    private LocalDateTime visitedDate;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

}
