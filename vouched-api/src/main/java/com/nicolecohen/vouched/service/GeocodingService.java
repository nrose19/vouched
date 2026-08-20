package com.nicolecohen.vouched.service;


import com.nicolecohen.vouched.dto.NominatimResponse;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import java.util.List;


@Service
public class GeocodingService {

    private final RestClient restClient;

    public GeocodingService(){
        this.restClient = RestClient.create();
    }

    public double[] geocodeAddress(String address){
        try {
            List<NominatimResponse> results = restClient.get()
                .uri("https://nominatim.openstreetmap.org/search?q={q}&format=json&limit=1", address)
                .header("User-Agent", "Vouched-App/1.0 (MSc dissertation project; contact: your@email.com)")
                .retrieve()
                .body(new ParameterizedTypeReference<List<NominatimResponse>>() {});



            if (results == null || results.isEmpty()) {
                return null;
            }
            NominatimResponse first = results.get(0);
            return new double[]{
                    Double.parseDouble(first.getLat()),
                    Double.parseDouble(first.getLon())
            };
        } catch (Exception e){
            System.err.println("Geocoding failed for address: " + address + " - " + e.getMessage());
            return null;
        }
    }

}

