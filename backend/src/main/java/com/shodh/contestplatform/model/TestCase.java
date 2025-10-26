package com.shodh.contestplatform.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "test_cases")
public class TestCase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "question_id")
    private Long questionId;
    
    @Column(name = "input_data", columnDefinition = "TEXT")
    private String inputData;
    
    @Column(name = "expected_output", columnDefinition = "TEXT")
    private String expectedOutput;
    
    @Column(name = "is_sample")
    private Boolean isSample;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", insertable = false, updatable = false)
    private Question question;
    
    // Constructors
    public TestCase() {}
    
    public TestCase(Long questionId, String inputData, String expectedOutput, Boolean isSample) {
        this.questionId = questionId;
        this.inputData = inputData;
        this.expectedOutput = expectedOutput;
        this.isSample = isSample;
        this.createdAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Long getQuestionId() { return questionId; }
    public void setQuestionId(Long questionId) { this.questionId = questionId; }
    
    public String getInputData() { return inputData; }
    public void setInputData(String inputData) { this.inputData = inputData; }
    
    public String getExpectedOutput() { return expectedOutput; }
    public void setExpectedOutput(String expectedOutput) { this.expectedOutput = expectedOutput; }
    
    public Boolean getIsSample() { return isSample; }
    public void setIsSample(Boolean isSample) { this.isSample = isSample; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public Question getQuestion() { return question; }
    public void setQuestion(Question question) { this.question = question; }
}
