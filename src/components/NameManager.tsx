
import { useState, useEffect } from 'react';
import { useNamesStore, Name } from '@/stores/namesStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2, Save, Plus, X } from 'lucide-react';

export const NameManager = () => {
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  
  const { names, loading, fetchNames, addName, updateName, deleteName } = useNamesStore();
  
  useEffect(() => {
    fetchNames();
  }, [fetchNames]);
  
  const handleAddName = async () => {
    if (newName.trim()) {
      await addName(newName.trim());
      setNewName('');
    }
  };
  
  const startEditing = (name: Name) => {
    setEditingId(name.id);
    setEditValue(name.name);
  };
  
  const cancelEditing = () => {
    setEditingId(null);
    setEditValue('');
  };
  
  const saveEdit = async (id: string) => {
    if (editValue.trim()) {
      await updateName(id, editValue.trim());
      setEditingId(null);
      setEditValue('');
    }
  };
  
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg">Name Manager</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Input 
            value={newName} 
            onChange={(e) => setNewName(e.target.value)} 
            placeholder="Enter a name"
            onKeyDown={(e) => e.key === 'Enter' && handleAddName()}
          />
          <Button onClick={handleAddName} disabled={loading || !newName.trim()}>
            <Plus size={16} className="mr-1" />
            Add
          </Button>
        </div>
        
        {loading && names.length === 0 ? (
          <div className="text-center py-4">Loading names...</div>
        ) : names.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {names.map((name) => (
                <TableRow key={name.id}>
                  <TableCell>
                    {editingId === name.id ? (
                      <Input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="w-full"
                        autoFocus
                        onKeyDown={(e) => e.key === 'Enter' && saveEdit(name.id)}
                      />
                    ) : (
                      name.name
                    )}
                  </TableCell>
                  <TableCell className="flex gap-1">
                    {editingId === name.id ? (
                      <>
                        <Button size="sm" variant="outline" onClick={() => saveEdit(name.id)}>
                          <Save size={16} />
                        </Button>
                        <Button size="sm" variant="outline" onClick={cancelEditing}>
                          <X size={16} />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button size="sm" variant="outline" onClick={() => startEditing(name)}>
                          <Edit size={16} />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-destructive" 
                          onClick={() => deleteName(name.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-4 text-gray-500">No names added yet</div>
        )}
      </CardContent>
    </Card>
  );
};
