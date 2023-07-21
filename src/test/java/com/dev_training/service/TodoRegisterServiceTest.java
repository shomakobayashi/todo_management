package com.dev_training.service;
import com.dev_training.entity.Account;
import com.dev_training.entity.AccountRepository;
import com.dev_training.entity.Todo;
import com.dev_training.entity.TodoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class TodoRegisterServiceTest {

    @Mock
    private TodoRepository todoRepository;

    @Mock
    private AccountRepository accountRepository;

    private TodoRegisterService todoRegisterService;

    @BeforeEach
    public void setUp() {
        //Mockitoライブラリを使用してモックオブジェクトを初期化するためのメソッド
        //@Mockアノテーションでマークされたフィールドと結び付けられる
        MockitoAnnotations.initMocks(this);
        //todoRepositoryとaccountRepositoryをTodoRegisterServiceのインスタンスに注入し、
        // todoRegisterServiceを介して関連するリポジトリへのアクセスやビジネスロジックの実行を行う
        todoRegisterService = new TodoRegisterService(todoRepository, accountRepository);
    }

    @Test
    public void testRegister() {
        Todo todo = new Todo();
        when(todoRepository.save(todo)).thenReturn(todo);

        // TODO登録処理が正常に行われることを確認するテストケース
        todoRegisterService.register(todo);
        //todoRepositoryのsaveメソッドが正確に1回呼び出されたことを確認することです。
        // これにより、todoオブジェクトが正常にtodoRepositoryに保存されたかどうかをテストすることができる。
        //verifyはsave()メソッドが1回呼び出されたか検証している。
        verify(todoRepository, times(1)).save(todo);
    }
    @Test
    public void testRegister_NullTodo() {
        // nullのTodoを登録した場合に例外が発生しないことを確認するテストケース
        //assertDoesNotThrow()は、指定されたコードブロックが例外をスローしないことを検証するために使用されるアサーションメソッド
        //これはラムダ式
        assertDoesNotThrow(() -> todoRegisterService.register(null));
    }

    @Test
    public void testIsValidDate() {
        // 無効な日付範囲の場合にtrueが返されないことを確認するテストケース
        boolean result = todoRegisterService.isValidDate("2023-07-15", "2023-07-01");
        assertFalse(result);
    }
    @Test
    public void testIsValidDate_NullStartDate() {
        // 開始日がnullの場合に無効な日付範囲として判定されることを確認するテストケース
        boolean result = todoRegisterService.isValidDate(null, "2023-07-01");
        //assertFalse(result)は、resultがfalseであることを検証するためのアサーション（検証）メソッド
        assertFalse(result);
    }
    @Test
    public void testIsValidDate_NullEndDate() {
        // 終了日がnullの場合に無効な日付範囲として判定されることを確認するテストケース
        boolean result = todoRegisterService.isValidDate("2023-07-01", null);
        assertFalse(result);
    }
    @Test
    public void testIsValidDate_NullStartAndEndDate() {
        // 開始日と終了日が両方ともnullの場合に無効な日付範囲として判定されることを確認するテストケース
        boolean result = todoRegisterService.isValidDate(null, null);
        assertFalse(result);
    }
    @Test
    public void testFindAllAccount() {
        // アカウントが1つ以上存在する場合に全アカウントのリストが返されることを確認するテストケース
        List<Account> accounts = new ArrayList<>();
        when(accountRepository.findAllAccount()).thenReturn(accounts);
        accounts.add(new Account());
        accounts.add(new Account());
        List<Account> result = todoRegisterService.findAllAccount();
        //assertEquals(2, result.size())は、resultのサイズが2であることを検証するためのアサーション（検証）メソッド
        assertEquals(2, result.size());
    }
    @Test
    public void testFindAllAccount_NoAccount() {
        // アカウントが存在しない場合に空のリストが返されることを確認するテストケース
        when(accountRepository.findAllAccount()).thenReturn(new ArrayList<>());

        List<Account> result = todoRegisterService.findAllAccount();
        //resultが空であることを検証するためのアサーション（検証）メソッド
        //resultが空でない場合、このアサーションは失敗し、テストはエラーとなります。
        assertTrue(result.isEmpty());
    }

    @Test
    public void testFindAccountById() {
        // 指定されたIDに対応するアカウントが存在する場合に正しいアカウントが返されることを確認するテストケース
        Account account = new Account();
        when(accountRepository.findById(1)).thenReturn(Optional.of(account));
        //Optional<Account>は、AccountオブジェクトをラップするOptionalクラスのインスタンス
        //Optionalは、値が存在する場合はその値をラップし、存在しない場合はnullを代わりに使用することで、
        // NullPointerExceptionを防ぐために使用されます。
        Optional<Account> result = todoRegisterService.findAccountById(1);
        //値が存在する場合にはisPresent()メソッドがtrueを返し、値が存在しない場合にはfalseを返します。
        assertTrue(result.isPresent());
        //resultというOptionalオブジェクトの値と等しいことを検証
        assertEquals(account, result.get());
    }

    @Test
    public void testFindAccountById_NonExistingAccount() {
        // 指定されたIDに対応するアカウントが存在しない場合に空のOptionalが返されることを確認するテストケース
        when(accountRepository.findById(100)).thenReturn(Optional.empty());

        Optional<Account> result = todoRegisterService.findAccountById(100);
        assertFalse(result.isPresent());
    }
}

