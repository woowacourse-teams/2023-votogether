package com.votogether.test;

import com.votogether.global.log.context.LogContext;
import com.votogether.test.persister.CategoryTestPersister;
import com.votogether.test.persister.CommentTestPersister;
import com.votogether.test.persister.MemberTestPersister;
import com.votogether.test.persister.PostTestPersister;
import com.votogether.test.persister.ReportTestPersister;
import com.votogether.test.persister.VoteTestPersister;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@SpringBootTest
public class ServiceTest {

    @MockBean
    LogContext logContext;

    @Autowired
    protected MemberTestPersister memberTestPersister;

    @Autowired
    protected CategoryTestPersister categoryTestPersister;

    @Autowired
    protected PostTestPersister postTestPersister;

    @Autowired
    protected CommentTestPersister commentTestPersister;

    @Autowired
    protected ReportTestPersister reportTestPersister;

    @Autowired
    protected VoteTestPersister voteTestPersister;

}
