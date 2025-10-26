package com.shodh.contestplatform.service;

import com.shodh.contestplatform.model.Contest;
import com.shodh.contestplatform.model.Question;
import com.shodh.contestplatform.repository.ContestRepository;
import com.shodh.contestplatform.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContestService {

    @Autowired
    private ContestRepository contestRepository;

    @Autowired
    private QuestionRepository questionRepository;

    public Optional<Contest> getContestById(Long id) {
        return contestRepository.findById(id);
    }

    public List<Contest> getAllContests() {
        return contestRepository.findAll();
    }

    public List<Question> getQuestionsByContestId(Long contestId) {
        return questionRepository.findByContestId(contestId);
    }
}
