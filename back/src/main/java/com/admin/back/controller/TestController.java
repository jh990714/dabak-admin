package com.admin.back.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class TestController {
    
    @GetMapping("path")
    public ResponseEntity<String> getMethodName() {
        return ResponseEntity.ok().body("success");
    }
    
}
