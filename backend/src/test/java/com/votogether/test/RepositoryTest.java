package com.votogether.test;

import com.votogether.global.config.JpaConfig;
import com.votogether.global.config.QuerydslConfig;
import com.votogether.test.persister.CategoryTestPersister;
import com.votogether.test.persister.CommentTestPersister;
import com.votogether.test.persister.MemberMetricTestPersister;
import com.votogether.test.persister.MemberTestPersister;
import com.votogether.test.persister.Persister;
import com.votogether.test.persister.PostTestPersister;
import com.votogether.test.persister.ReportTestPersister;
import com.votogether.test.persister.VoteTestPersister;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.context.annotation.Import;

@Import({JpaConfig.class, QuerydslConfig.class})
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@DataJpaTest(includeFilters = @ComponentScan.Filter(type = FilterType.ANNOTATION, classes = Persister.class))
public class RepositoryTest {

    @Autowired
    protected CategoryTestPersister categoryTestPersister;

    @Autowired
    protected CommentTestPersister commentTestPersister;

    @Autowired
    protected MemberMetricTestPersister memberMetricTestPersister;

    @Autowired
    protected MemberTestPersister memberTestPersister;

    @Autowired
    protected PostTestPersister postTestPersister;

    @Autowired
    protected ReportTestPersister reportTestPersister;

    @Autowired
    protected VoteTestPersister voteTestPersister;

}
