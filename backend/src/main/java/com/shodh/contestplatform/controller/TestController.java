package com.shodh.contestplatform.controller;

import com.shodh.contestplatform.model.User;
import com.shodh.contestplatform.model.Contest;
import com.shodh.contestplatform.model.Question;
import com.shodh.contestplatform.repository.UserRepository;
import com.shodh.contestplatform.repository.ContestRepository;
import com.shodh.contestplatform.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class TestController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ContestRepository contestRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @GetMapping("/test-database")
    public Map<String, Object> testDatabase() {
        Map<String, Object> result = new HashMap<>();
        
        try {
            // Test users
            List<User> users = userRepository.findAll();
            result.put("users_count", users.size());
            result.put("users", users);
            
            // Test contests
            List<Contest> contests = contestRepository.findAll();
            result.put("contests_count", contests.size());
            result.put("contests", contests);
            
            // Test questions
            List<Question> questions = questionRepository.findAll();
            result.put("questions_count", questions.size());
            result.put("questions", questions);
            
            result.put("status", "SUCCESS");
            result.put("message", "Database is populated and working!");
            
        } catch (Exception e) {
            result.put("status", "ERROR");
            result.put("message", "Database error: " + e.getMessage());
        }
        
        return result;
    }

    @GetMapping("/login-info")
    public Map<String, Object> getLoginInfo() {
        Map<String, Object> result = new HashMap<>();
        
        try {
            List<User> users = userRepository.findAll();
            result.put("available_users", users);
            result.put("login_instructions", "Use any of the usernames above to login");
            result.put("note", "Password is 'password' for all test users");
            
        } catch (Exception e) {
            result.put("error", "Could not fetch users: " + e.getMessage());
        }
        
        return result;
    }
}
