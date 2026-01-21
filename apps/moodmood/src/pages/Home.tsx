import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonCheckbox,
  IonAlert,
} from '@ionic/react';
import { useState } from 'react';

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showAlert, setShowAlert] = useState(false);

  const addTodo = (text: string) => {
    if (!text.trim()) return;
    setTodos([...todos, { id: Date.now(), text, done: false }]);
  };

  return (
    <IonPage>
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>หน้าแรก</IonTitle>
        </IonToolbar>
      </IonHeader> */}

      <IonContent className="ion-padding">
        {/* Mood Card */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>วันนี้เป็นยังไงบ้าง?</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonButton expand="block">+ บันทึกอารมณ์</IonButton>
          </IonCardContent>
        </IonCard>

        {/* To-do list Card */}
        <IonCard>
          <IonCardHeader>
            <IonItem lines="none">
              <IonLabel>To-do list</IonLabel>
              <IonButton slot="end" fill="clear" onClick={() => setShowAlert(true)}>
                + เพิ่มรายการ
              </IonButton>
            </IonItem>
          </IonCardHeader>

          <IonCardContent>
            <IonList>
              {todos.map(todo => (
                <IonItem key={todo.id}>
                  <IonCheckbox
                    slot="start"
                    checked={todo.done}
                    onIonChange={() =>
                      setTodos(todos.map(t =>
                        t.id === todo.id ? { ...t, done: !t.done } : t
                      ))
                    }
                  />
                <IonLabel
                    style={{
                        textDecoration: todo.done ? 'line-through' : 'none',
                        opacity: todo.done ? 0.5 : 1,
                    }}
                    >
                    {todo.text}
                 </IonLabel>
                </IonItem>
              ))}
            </IonList>
          </IonCardContent>
        </IonCard>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="เพิ่มรายการ"
          inputs={[
            {
              name: 'todo',
              type: 'text',
              placeholder: 'พิมพ์สิ่งที่ต้องทำ...',
            },
          ]}
          buttons={[
            {
              text: 'ยกเลิก',
              role: 'cancel',
            },
            {
              text: 'เพิ่ม',
              handler: (data) => {
                addTodo(data.todo);
              },
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
