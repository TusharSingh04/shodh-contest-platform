package com.shodh.contestplatform.controller;

import com.shodh.contestplatform.model.Contest;
import com.shodh.contestplatform.model.Question;
import com.shodh.contestplatform.repository.ContestRepository;
import com.shodh.contestplatform.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ContestController {

    @Autowired
    private ContestRepository contestRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @GetMapping("/contests/{contestId}")
    public ResponseEntity<Map<String, Object>> getContest(@PathVariable Long contestId) {
        try {
            Optional<Contest> contestOpt = contestRepository.findById(contestId);
            if (contestOpt.isEmpty()) {
                Map<String, Object> response = new HashMap<>();
                response.put("error", "Contest not found");
                return ResponseEntity.notFound().build();
            }

            Contest contest = contestOpt.get();
            List<Question> questions = questionRepository.findByContestId(contestId);

            Map<String, Object> response = new HashMap<>();
            response.put("id", contest.getId());
            response.put("title", contest.getTitle());
            response.put("description", contest.getDescription());
            response.put("status", contest.getStatus().toString());
            response.put("startTime", contest.getStartTime());
            response.put("endTime", contest.getEndTime());
            response.put("questions", questions);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("error", "Failed to fetch contest: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @GetMapping("/contests")
    public ResponseEntity<List<Contest>> getAllContests() {
        try {
            List<Contest> contests = contestRepository.findAll();
            return ResponseEntity.ok(contests);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
