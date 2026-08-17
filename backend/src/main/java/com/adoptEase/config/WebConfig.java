package com.adoptEase.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {

	    // Child images
	    registry.addResourceHandler("/images/children/**")
	            .addResourceLocations("file:uploads/children/");

	    // Parent images
	    registry.addResourceHandler("/images/parents/**")
	            .addResourceLocations(
	                    "file:src/main/resources/static/images/parents/"
	            );

	    // Center images
	    registry.addResourceHandler("/images/centers/**")
	            .addResourceLocations(
	                    "file:src/main/resources/static/images/centers/"
	            );
	}
}