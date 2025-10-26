package com.shodh.contestplatform.repository;

import com.shodh.contestplatform.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByContestId(Long contestId);
    List<Question> findByContestIdOrderByPointsAsc(Long contestId);
}
