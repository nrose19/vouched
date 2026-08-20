package com.nicolecohen.vouched.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Getter
public class NominatimResponse {
    @JsonProperty("lat") private String lat;
    @JsonProperty("lon") private String lon;
}
