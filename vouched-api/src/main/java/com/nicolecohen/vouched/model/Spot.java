package com.nicolecohen.vouched.model;

import com.nicolecohen.vouched.enums.Category;
import com.nicolecohen.vouched.enums.PrivacyLevel;
//lombok allows for automatic creation of getters/setters. This de-clutters the file and saves us from boiler plate code
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Spot {

    private UUID id;
    private String ownerId;
    private String city;
    private Category category;
    private String name;
    private String address;
    private String notes;
    private PrivacyLevel privacyLevel;
    private List<String> vibeTags;
    private boolean isVisited;
    private boolean wantsToVisit;
    private LocalDateTime visitedDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
