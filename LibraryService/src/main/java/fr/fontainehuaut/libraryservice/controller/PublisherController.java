package fr.fontainehuaut.libraryservice.controller;

import fr.fontainehuaut.libraryservice.entity.PublisherEntity;
import fr.fontainehuaut.libraryservice.service.PublisherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController()
@RequestMapping("/publisher")
public class PublisherController {

    private final PublisherService publisherService;

    public PublisherController(@Autowired PublisherService publisherService){
        this.publisherService = publisherService;
    }

    @GetMapping(value="/")
    public Collection<PublisherEntity> getAll(){
        return publisherService.findAll();
    }



}
