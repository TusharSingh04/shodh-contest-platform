package com.shodh.contestplatform.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "questions")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;
    
    private Integer points;
    
    @Column(name = "time_limit_seconds")
    private Integer timeLimitSeconds;
    
    @Column(name = "memory_limit_mb")
    private Integer memoryLimitMb;
    
    @Column(name = "contest_id")
    private Long contestId;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contest_id", insertable = false, updatable = false)
    private Contest contest;
    
    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<TestCase> testCases;
    
    // Constructors
    public Question() {}
    
    public Question(String title, String description, Difficulty difficulty, Integer points, 
                   Integer timeLimitSeconds, Integer memoryLimitMb, Long contestId) {
        this.title = title;
        this.description = description;
        this.difficulty = difficulty;
        this.points = points;
        this.timeLimitSeconds = timeLimitSeconds;
        this.memoryLimitMb = memoryLimitMb;
        this.contestId = contestId;
        this.createdAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public Difficulty getDifficulty() { return difficulty; }
    public void setDifficulty(Difficulty difficulty) { this.difficulty = difficulty; }
    
    public Integer getPoints() { return points; }
    public void setPoints(Integer points) { this.points = points; }
    
    public Integer getTimeLimitSeconds() { return timeLimitSeconds; }
    public void setTimeLimitSeconds(Integer timeLimitSeconds) { this.timeLimitSeconds = timeLimitSeconds; }
    
    public Integer getMemoryLimitMb() { return memoryLimitMb; }
    public void setMemoryLimitMb(Integer memoryLimitMb) { this.memoryLimitMb = memoryLimitMb; }
    
    public Long getContestId() { return contestId; }
    public void setContestId(Long contestId) { this.contestId = contestId; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public Contest getContest() { return contest; }
    public void setContest(Contest contest) { this.contest = contest; }
    
    public List<TestCase> getTestCases() { return testCases; }
    public void setTestCases(List<TestCase> testCases) { this.testCases = testCases; }
    
    public enum Difficulty {
        EASY, MEDIUM, HARD
    }
}
