package speaker.lessons.backend.configs;

import org.modelmapper.ModelMapper;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * Global configurations for the project.
 */
@Configuration
@ComponentScan(basePackages = {
        "speaker.lessons.backend.controllers", "speaker.lessons.backend.services",
        "speaker.lessons.backend.configs", "speaker.lessons.backend.dtos", "speaker.lessons.backend.security"
})
@EntityScan(basePackages = {"speaker.lessons.backend.models"})
@EnableJpaRepositories(basePackages = {"speaker.lessons.backend.repositories"})
@EnableTransactionManagement
public class ManagementConfig {
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}

