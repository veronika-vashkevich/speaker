package com.speakmast.backend.config;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class ServicesConfig {

    @Bean
    RestTemplate getRestTemplate() {
        return new RestTemplateBuilder().build();
    }

    // example from rewards
    //    @Bean
    //    public ThirdPartyRewardGateway thirdPartyRewardGateway(
    //            @Value("${rgp.remote.thirdPartyRewards.service.grant}") String thirdPartyRewardsGrantEndpoint,
    //            @Value("${rgp.remote.thirdPartyRewards.service.get}") String thirdPartyRewardsGetEndpoint,
    //            RestTemplate restTemplate) {
    //        return new ThirdPartyRewardGateway(thirdPartyRewardsGrantEndpoint, thirdPartyRewardsGetEndpoint, restTemplate);
    //    }
}
