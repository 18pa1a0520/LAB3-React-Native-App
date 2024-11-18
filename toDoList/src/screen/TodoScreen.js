import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Animated } from "react-native";
import React, { useState, useEffect } from "react";
import { IconButton } from "react-native-paper";
import Fallback from "../components/Fallback";

const TodoScreen = () => {
    const [todo, setTodo] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [editedTodo, setEditedTodo] = useState(null);

    const handleAddTodo = () => {
        if (todo.trim() === "") return; // Prevent adding empty tasks
        const newTodo = { id: Date.now().toString(), title: todo, completed: false };
        
        // Add the new task with animated values
        setTodoList((prevList) => [
            ...prevList,
            { ...newTodo, fadeAnim: new Animated.Value(0), translateAnim: new Animated.Value(30) },
        ]);

        setTodo("");
    };

    const handleDeleteTodo = (id) => {
        const taskToDelete = todoList.find((todo) => todo.id === id);
        
        if (taskToDelete) {
            Animated.timing(taskToDelete.fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start(() => {
                const updatedTodoList = todoList.filter((todo) => todo.id !== id);
                setTodoList(updatedTodoList);
            });
        }
    };

    const handleEditTodo = (todo) => {
        setEditedTodo(todo);
        setTodo(todo.title);
    };

    const handleUpdateTodo = () => {
        const updatedTodos = todoList.map((item) => {
            if (item.id === editedTodo.id) {
                return { ...item, title: todo };
            }
            return item;
        });
        setTodoList(updatedTodos);
        setEditedTodo(null);
        setTodo("");
    };

    const toggleCompleteTodo = (id) => {
        const updatedTodos = todoList.map((item) => {
            if (item.id === id) {
                return { ...item, completed: !item.completed };
            }
            return item;
        });
        setTodoList(updatedTodos);
    };

    // Run animation effects once the component mounts
    useEffect(() => {
        todoList.forEach((item) => {
            // Fade in and slide in animation for new tasks
            Animated.timing(item.fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();

            Animated.timing(item.translateAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        });
    }, [todoList]); // Trigger this effect whenever `todoList` is updated

    const renderTodos = ({ item }) => {
        return (
            <Animated.View
                style={{
                    backgroundColor: item.completed ? "#90ee90" : "#1e90ff",
                    borderRadius: 6,
                    paddingHorizontal: 6,
                    paddingVertical: 8,
                    marginBottom: 12,
                    flexDirection: "row",
                    alignItems: "center",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 3,
                    opacity: item.fadeAnim,
                    transform: [{ translateX: item.translateAnim }],
                }}
            >
                <IconButton icon="check" iconColor="#fff" onPress={() => toggleCompleteTodo(item.id)} />
                <IconButton icon="pencil" iconColor="#fff" onPress={() => handleEditTodo(item)} />
                <IconButton icon="trash-can" iconColor="#fff" onPress={() => handleDeleteTodo(item.id)} />
                <Text
                    style={{
                        color: "#fff",
                        fontSize: 20,
                        fontWeight: "800",
                        flex: 1,
                        textDecorationLine: item.completed ? "line-through" : "none",
                    }}
                >
                    {item.title}
                </Text>
            </Animated.View>
        );
    };

    return (
        <View style={{ marginHorizontal: 16 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>TodoScreen</Text>
            <TextInput
                style={{
                    borderWidth: 2,
                    borderColor: "#1e90ff",
                    borderRadius: 6,
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    marginBottom: 16,
                }}
                placeholder="Add a task"
                value={todo}
                onChangeText={(userText) => setTodo(userText)}
            />
            {editedTodo ? (
                <TouchableOpacity
                    style={{
                        backgroundColor: "#000",
                        borderRadius: 6,
                        paddingVertical: 8,
                        marginBottom: 34,
                        alignItems: "center",
                    }}
                    onPress={handleUpdateTodo}
                >
                    <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>Save</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    style={{
                        backgroundColor: "#000",
                        borderRadius: 6,
                        paddingVertical: 8,
                        marginBottom: 34,
                        alignItems: "center",
                    }}
                    onPress={handleAddTodo}
                >
                    <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>Add</Text>
                </TouchableOpacity>
            )}

            <FlatList
                data={todoList}
                keyExtractor={(item) => item.id}
                renderItem={renderTodos}
                ListEmptyComponent={<Fallback />}
            />
        </View>
    );
};

export default TodoScreen;

const styles = StyleSheet.create({});
