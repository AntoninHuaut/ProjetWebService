package fr.fontainehuaut.libraryservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

import javax.xml.datatype.XMLGregorianCalendar;

@Configuration
public class SpringConfig {

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .directModelSubstitute(XMLGregorianCalendar.class, String.class)
                .select()
                .apis(RequestHandlerSelectors.withMethodAnnotation(RequestMapping.class))
                .apis(RequestHandlerSelectors.withClassAnnotation(RestController.class))
                .paths(PathSelectors.regex("/.*"))
                .build()
                .pathMapping("/")
                .apiInfo(metadata());
    }

    private ApiInfo metadata() {
        return new ApiInfoBuilder()
                .title("Library Service")
                .description("The library service")
                .version("1.0.0")
                .contact(new Contact("Antonin, Luc, Quentin", "", ""))
                .license("MIT")
                .licenseUrl("https://opensource.org/licenses/MIT")
                .build();
    }
}
