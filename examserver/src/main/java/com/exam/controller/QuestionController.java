package com.exam.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;
import com.exam.service.QuestionService;
import com.exam.service.QuizService;

@RestController
@RequestMapping("/question")
@CrossOrigin(origins = "http://localhost:4200")
public class QuestionController {
	
	@Autowired
	private QuestionService questionService;
	
	@Autowired
	private QuizService quizService;
	
	
	//api calls
	//add quiz
		@PostMapping("/")
		public ResponseEntity<?> addQuestion(@RequestBody Question question) {
			
			return ResponseEntity.ok(this.questionService.addQuestion(question));
		}
		
		@PutMapping("/")
		public ResponseEntity<?> updateQuestion(@RequestBody Question question) {
			
			return ResponseEntity.ok(this.questionService.addQuestion(question));
		}
		
		@GetMapping("/")
		public ResponseEntity<?> getQuestions(){
			return ResponseEntity.ok(this.questionService.getQuestions());
		}
		
		@GetMapping("/{quesId}")
		public Question getQuestion(@PathVariable("quesId")Long quesId) {
			
			return this.questionService.getQuestion(quesId);
		}
		
		//delete mapping
		@DeleteMapping("/{quesId}")
		public void deleteQuestion(@PathVariable("quesId")Long questionId) {

			this.questionService.deleteQuestion(questionId);
		}
	
		//get questions of particular quiz
		@GetMapping("/quiz/{quizId}")
		public ResponseEntity<?> getQuestionsOfQuiz(@PathVariable("quizId")Long quizId){
			
			//Quiz quiz = new Quiz();
			//quiz.setQid(quizId);
			//Set<Question> questionsOfQuiz = this.questionService.getQuestionsOfQuiz(quiz);
			//return ResponseEntity.ok(questionsOfQuiz);
			
			Quiz quiz=this.quizService.getQuiz(quizId);
			Set<Question> questions = quiz.getQuestions();
			List list = new ArrayList<>(questions);
			if(list.size()>Integer.parseInt(quiz.getNumberOfQuestions())) {
				list = list.subList(0, Integer.parseInt(quiz.getNumberOfQuestions()+1));
			}
			Collections.shuffle(list);
			return ResponseEntity.ok(list);
			
		}
		
		@GetMapping("/quiz/all/{quizId}")
		public ResponseEntity<?> getQuestionsOfQuizAdmin(@PathVariable("quizId")Long quizId){
			
			Quiz quiz = new Quiz();
			quiz.setQid(quizId);
			Set<Question> questionsOfQuiz = this.questionService.getQuestionsOfQuiz(quiz);
			return ResponseEntity.ok(questionsOfQuiz);
			
			
		}
		
		

}
