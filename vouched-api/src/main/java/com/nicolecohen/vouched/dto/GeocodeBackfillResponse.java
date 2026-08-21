package com.nicolecohen.vouched.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

//    updating the spots added prior to leaflet/open map integration -- need to update their lat/lon
@Getter
@AllArgsConstructor
public class GeocodeBackfillResponse {
    private int attempted;
    private int succeeded;
    private int failed;
    private int skipped;
}
