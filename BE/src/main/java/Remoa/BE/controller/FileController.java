package Remoa.BE.controller;

import Remoa.BE.service.FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins="*")
public class FileController {

    private final FileService fileService;

    @PostMapping("/upload")
    public ResponseEntity upload(@RequestParam("files") MultipartFile[] files // 파일 받기
    ) {
        // 1. response 객체 생성
        HashMap<String, Object> resultMap = new HashMap<>();
        HashMap<String, Object> responseData = new HashMap<>();

        // 2. 받은 파일 데이터 확인
        List<HashMap<String, Object>> fileNames = new ArrayList<>();
        Arrays.stream(files).forEach(f -> {
            HashMap<String, Object> map = new HashMap<>();
            String originalFilename = f.getOriginalFilename();
            String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String saveFileName = UUID.randomUUID() + extension;
            log.info("originalFilename = {}", originalFilename);
            log.info("saveFileName = {}", saveFileName);
            map.put("fileName", saveFileName);
            map.put("fileSize", f.getSize());

            fileNames.add(map);
            fileService.save(f, saveFileName);
        });

        // 3. response 하기
        responseData.put("files", fileNames);
        resultMap.put("response", responseData);
        return ResponseEntity.ok().body(resultMap);
    }
}
