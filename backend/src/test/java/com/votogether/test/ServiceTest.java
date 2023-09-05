package com.votogether.test;

import com.votogether.test.persister.CommentTestPersister;
import com.votogether.test.persister.MemberTestPersister;
import com.votogether.test.persister.PostTestPersister;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@SpringBootTest
public class ServiceTest {

    @Autowired
    protected MemberTestPersister memberTestPersister;

    @Autowired
    protected PostTestPersister postTestPersister;

    @Autowired
    protected CommentTestPersister commentTestPersister;

}
